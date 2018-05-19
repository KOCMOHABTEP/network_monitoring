var express = require('express');
var path = require('path');
var si = require('systeminformation');
var ejs = require('ejs');
var fs = require('fs');
var os = require('os');
var speedTest = require('speedtest-net');
var nmap = require('node-nmap');
var util = require('util');
var network = require('network');

var app = express();

app.set('views', path.join(__dirname, '/dist'));
app.use(express.static('dist'));

app.set('view engine', 'ejs');

var location = path.join(__dirname, 'dist/');

//------------------
// Мониторинг

    nmap.nmapLocation = "nmap"; //default
    var nmapscan = new nmap.NmapScan('192.168.1.0-255', '-O');
    nmapscan.on('complete',function(data){
    
        app.locals.scanning = data;
        console.log(util.inspect(app.locals.scanning,{colors: true, depth: 4}))
        //console.log(res.locals.scanning);
    });
    
    nmapscan.startScan(function(){
        console.log('Обновление результатов...')
    });

    network.get_active_interface(function(err, list) {
        console.log(list);
        app.locals.networkInformation = list;
      })
    
    
//------------------

app.use(function (req, res, next) {
    si.cpu(function (cpu) {
        res.locals.cpu = cpu;
        next();
    });
})

app.use(function (req, res, next) {
    si.osInfo(function (os) {
        res.locals.os = os;
        next();
    })
})

app.use(function (req, res, next) {
    si.networkInterfaces(function (network) {
        //console.log(network);
        res.locals.ip6 = network[0].ip6;
        res.locals.mac = network[0].mac;
        res.locals.network = network;
        next();
    })
})

app.use(function (req, res, next) {
    si.users(function (users) {
        res.locals.users = users;
        next();
    })
})

app.use(function (req, res, next) {
    si.system(function (system) {
        res.locals.system = system;
        next();
    })
})
app.use(function (req, res, next) {
    // Время в сети: 
    res.locals.uptime = (si.time().uptime/(60*60)).toFixed(1); //часов
    next();
})
app.use(function (req, res, next) {
    si.bios(function (bios) {
        // Системное ПО:
        res.locals.bios = bios.vendor + ' ' + bios.version;
        next();
    })
})
// Процентное соотношение
app.use(function (req, res, next) {
    si.fsSize(function (fssize) {
        //console.log('Занято на диске:')
        res.locals.fssize = ((fssize[0].size)/(8*1024*1024*1014)).toFixed(2);
        //console.log('Места свободно:');
        res.locals.fsuse = (100 - (fssize[0].use).toFixed(2)).toFixed(2);
        //console.log('Тип файловой системы: ')
        res.locals.fstype = fssize[0].type;
        next();
    })
})
app.use(function (req, res, next) {
    si.currentLoad(function (load) {
        //console.log('Нагрузка на CPU:')
        res.locals.load = (load.currentload).toFixed(2);
        next();
    })
})
app.use(function (req, res, next) {
    si.diskLayout(function (diskLayout) {
        // Максимальный объем диска: 
        res.locals.diskLayout = (diskLayout[0].size / (1024*1024*1024)).toFixed(0);
        next();
    })
})

app.use(function (req, res, next) {
    speedTest({maxTime: 1000}).on('data', networkInfo => {
        res.locals.networkSpeed = (networkInfo.speeds.download).toFixed(1) + ' Мб/с';
        res.locals.networkInfo = networkInfo.server.cc + ' ' + networkInfo.server.sponsor;
        next();
      })
})

// Rendering
app.get('/', function (req, res) {

    res.render('pages/index', {
        cpu: 'Процессор: ' + res.locals.cpu.manufacturer +' '+ res.locals.cpu.brand,
        os: 'Операционная система: ' + res.locals.os.distro +' '+ res.locals.os.arch,
        compname: 'Имя компьютера: ' + res.locals.os.hostname,
        netname: 'Название подключения: ' + res.locals.network[0].iface,
        ipadress: 'IP адрес: ' + res.locals.network[0].ip4,
        username: 'Пользователь: '+ res.locals.users[0].user,
        device: 'Устройство: ' + res.locals.system.manufacturer + ' ' + res.locals.system.model,
        fssize: res.locals.fssize + ' ГБ',
        fsuse: res.locals.fsuse + '%',
        cpuload: res.locals.load + '%',
        serverLocation: res.locals.networkInfo,
        serverSpeed: res.locals.networkSpeed,
        uptime: res.locals.uptime + ' часов',
        disksize: res.locals.diskLayout + ' ГБ',
        fstype: res.locals.fstype,
        ip6: res.locals.ip6,
        mac: res.locals.mac,
        bios: res.locals.bios
    })

    res.end();

})

app.get('/monitoring', function (req, res) {
    res.render('pages/monitoring', {
        scanning: app.locals.scanning,
        netdevice: app.locals.networkInformation
    })
    res.end();
})
app.get('/notification', function (req, res) {
    // res.render('pages/notification', {
    //     scanning: app.locals.scanning,
    //     netdevice: app.locals.networkInformation
    // })
    res.end();
})


app.listen(1337, function () {
    console.log('Listening on port 1337');
})
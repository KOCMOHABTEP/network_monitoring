# Конструктор помещений
3D конструктор помещений, на основе библиотеки three.js и технологий WebGL.
Возможность загрузки своих 3D моделей

## Необходимо установить:
- npm install gulp -g

## Пакет включает в себя:
- Gulp
- Bower
- SCSS
- PUG
- ES6

## Чтобы начать:

- npm install
- bower install
- gulp 


## rem-calc()
Функция для перевода пикселей в em.  
Пример использования:
```
padding: rem-calc(10);
margin: rem-calc(10 10 5 5);
```

## respond-to()
Миксин для добавление медиазапросу к классу.  
Пример использования:
```
.block{
    ...
    @include respond-to(normal){
        flex-direction: column;
    }
}
```



# Web pack for frontend

Пакет для верстки сайтов (frontend)

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
```scss
padding: rem-calc(10);
margin: rem-calc(10 10 5 5);
```

## respond-to()
Миксин для добавление медиазапросу к классу.  
Пример использования:
```scss
.block{
    ...
    @include respond-to(normal){
        flex-direction: column;
    }
}
```



## Список миксинов

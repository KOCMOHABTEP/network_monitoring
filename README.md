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

## Normalize.css
Normalize.css — это небольшой CSS-файл, который обеспечивает для HTML-элементов лучшую кроссбраузерность в стилях по умолчанию.

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



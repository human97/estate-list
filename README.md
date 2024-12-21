# Описание проекта
Приложение для управления списком объектов недвижимости, выставленных на продажу.

## Структура проекта
Проект состоит из Backend сервера, реализующего API для нашего Frontend приложения. Frontend приложение Vue3. 

- **applications/frontend**: frontend приложение
- **applications/server**: простой backend сервер для приложения

## Запуск проекта и системные требования
Для работы с проектом рекомендуется иметь Node.js версии не ниже 18 и pnpm версии не ниже 8.6

### Запуск сервера
```shell
pnpm start:server
```

### Запуск frontenda
```shell
pnpm start:frontend
```

После запуска сервера, вам будет доступно api по адресу http://localhost:3000/estates с тремя query параметрами:
```
type GetEstatesParams = {
  city?: string;
  type?: string;
  search?: string;
};
```

### Форматирование
```shell
pnpm format
```

## Шаг 1. Добавил страницу списка объявлений и запрос данных

**Сделал** 
- Добавил страницу списка объектов, доступную по адресу (`/estates`)
- Сделал, чтобы эта страница отображалась при открытии приложения (без изменения адреса страницы)
- Добавил запрос на получение списка объектов с backend (`estates query`)
- Добал вызов получения данных при открытии страницы списка объектов


## Шаг 2. Отображение таблицы объектов

**Сделал** 
- Отобраются данные в виде таблицы, со след. колонками
  - Адрес
  - Город
  - Тип (_варианты значений: Квартира, Дом, Коммерческая недвижимость_)
  - Цена

## 3. Фильтрация по городу

- Фильтрацию объектов по городу (фильтрация работает по принципу полного совпадения)
  - В колонке "Город" добавить кнопку фильтрации (будет отображена в каждой строке)
  - По клику на кнопку, выполняется новый запрос на backend, используя выбранное значение в качестве фильтра (см `estates query`)
  - Обновляются данные на странице
  - Кнопка очистки фильтров

##4. Поиск по адресу
Поиск по адресу

- Текстовый Input над таблицей, рядом с кнопкой очистки
- При вводе текста в Input, запрос на backend, использует это значение в качестве параметра `search` в запросе `estates`
- Если при вводе в строку поиска, на странице уже есть выбранные фильтры, они очищаются
- Обновляются данные на странице 
- Очистка поиска по нажатию кнопку очистки фильтров
  - Происходила очистка не только фильтров, но и поиска
- Выделяется найденное совпадение адреса цветом:
  - Поиск по адресу работает по частичному совпадению (напр. поисковый запрос **"ос"** вернет _**"Московское шоссе"**_ и _**"1-я Останкинская улица"**_)
  - Для пользователя подсвечивается найденное совпадение, выделив их желтым цветом (в примере выше выделение будет работать по принципу: "М**ос**ковское шоссе", "1-я **Ос**танкинская улица"")
  - Поиск не учитывает заглавные буквы (например, "1-я Останкинская улица" из примера выше)ё
  - Для выделения букв используется background желтого цвета


create table blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);
insert into blogs (author, url, title, likes)
values ('test1', 'https://test1.com', 'test blog 1', 3);
insert into blogs (author, url, title, likes)
values ('test2', 'http://test2.com', 'test blog 2', 10);
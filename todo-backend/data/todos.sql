-- DROP TABLE public.todos;
CREATE TABLE public.todos (
	id varchar NOT NULL,
	body varchar NOT NULL,
	completed BOOLEAN NOT NULL
);
ALTER TABLE public.todos
ADD CONSTRAINT todos_pk PRIMARY KEY (id);
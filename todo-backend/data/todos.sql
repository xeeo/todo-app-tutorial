-- DROP TABLE public.todos;

CREATE TABLE public.todos (
   	id bpchar(8) NOT NULL,
   	body varchar NOT NULL
);

ALTER TABLE public.todos
	ADD CONSTRAINT todos_pk
		PRIMARY KEY (id);
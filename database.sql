CREATE TABLE "todo"
    (
        "id" SERIAL PRIMARY KEY,
        "taskname" VARCHAR (250) NOT NULL,
        "isDone" BOOLEAN NOT NULL,
        "whenComplete" DATE
    );

INSERT INTO "todo"
    ("taskname", "isDone")
VALUES
    ('Pick up clothes', false),
    ('Get oil changed', false),
    ('Buy bread', false),
    ('Prepare for school', false),
    ('Exercise', false),
    ('Shovel sidewalk', false),
    ('Make full-stack application', false),
    ('Go to space', false);

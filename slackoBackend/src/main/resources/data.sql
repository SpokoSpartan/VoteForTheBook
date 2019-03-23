INSERT INTO "user" (email, nick_name, password, registration_token)
VALUES ('wojtek@gmail.com', 'Spoko', '$2a$10$VIgMONiuWy6t.f1xRkNeSuxyjLtrnzvUsB1e7WWWMm9k8vzSrN38W', 'AUTHORIZED');
INSERT INTO "user" (email, nick_name, password, registration_token)
VALUES ('wojtek2@gmail.com', 'SpokoSpartan', '$2a$10$VIgMONiuWy6t.f1xRkNeSuxyjLtrnzvUsB1e7WWWMm9k8vzSrN38W', 'AUTHORIZED');
INSERT INTO "user" (email, nick_name, password, registration_token)
VALUES ('wojtek3@gmail.com', 'Platfus', '$2a$10$VIgMONiuWy6t.f1xRkNeSuxyjLtrnzvUsB1e7WWWMm9k8vzSrN38W', 'AUTHORIZED');
INSERT INTO "user" (email, nick_name, password, registration_token)
VALUES ('wojtek4@gmail.com', 'Platfik', '$2a$10$VIgMONiuWy6t.f1xRkNeSuxyjLtrnzvUsB1e7WWWMm9k8vzSrN38W', 'AUTHORIZED');

INSERT INTO author (author_full_name) VALUES ('Tomasz Nurkiewicz');
INSERT INTO author (author_full_name) VALUES ('Ben Christensen');
INSERT INTO book_category (book_category_name) VALUES ('Programming');
INSERT INTO "book" ("cover_picture_url", "description", "isbn", "publication_date", "title")
    VALUES ('http://books.google.com/books/content?id=ydMsjwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
            'In today’s app-driven era, when programs are asynchronous and responsiveness is so vital,' ||
            ' reactive programming can help you write code that’s more reliable, easier to scale,' ||
            ' and better-performing. With this practical book, Java developers will first learn how to view problems in the reactive way,' ||
            ' and then build programs that leverage the best features of this exciting new programming paradigm. ' ||
            'Authors Tomasz Nurkiewicz and Ben Christensen include concrete examples that use the RxJava library to solve real-world ' ||
            'performance issues on Android devices as well as the server. You’ll learn how RxJava leverages parallelism and concurrency' ||
            ' to help you solve today’s problems. This book also provides a preview of the upcoming 2.0 release. Write programs that react' ||
            ' to multiple asynchronous sources of input without descending into "callback hell" Get to that aha! moment when you understand' ||
            ' how to solve problems in the reactive way Cope with Observables that produce data too quickly to be consumed Explore strategies' ||
            ' to debug and to test programs written in the reactive style Efficiently exploit parallelism and concurrency in your programs Learn' ||
            ' about the transition to RxJava version 2', '9781491931653', '2016-12-31T00:00:00.000+0000', 'Reactive Programming with RxJava');
INSERT INTO book_details_authors ("book_details_id", "author_id") VALUES (1, 1);
INSERT INTO book_details_authors ("book_details_id", "author_id") VALUES (1, 2);
INSERT INTO book_details_categories ("book_details_id", "category_id") VALUES (1, 1);


INSERT INTO author (author_full_name) VALUES ('Henry Wong');
INSERT INTO author (author_full_name) VALUES ('Scott Oaks');
INSERT INTO "book" ("cover_picture_url", "description", "isbn", "publication_date", "title")
VALUES ('http://books.google.com/books/content?id=mB_92VqJbsMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        'Explains how to use Java''s portable platforms to program and use threads effectively and efficiently ' ||
        'while avoiding common mistakes.', '9780596007829', '2004-12-31T00:00:00.000+0000', 'Java Threads');
INSERT INTO book_details_authors ("book_details_id", "author_id") VALUES (2, 3);
INSERT INTO book_details_authors ("book_details_id", "author_id") VALUES (2, 4);
INSERT INTO book_details_categories ("book_details_id", "category_id") VALUES (2, 1);


INSERT INTO author (author_full_name) VALUES ('Pablo Acuña');
INSERT INTO "book" ("cover_picture_url", "description", "isbn", "publication_date", "title")
VALUES ('http://books.google.com/books/content?id=jlYXvgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
        'This concise teaches you how to use the power of Docker and Kubernetes to deploy your Rails applications easily and efficiently.' ||
        ' Docker and Kubernetes are increasing in popularity every day, but what if you want to leverage their benefits for your ' ||
        'Rails application? This is the book you need. Deploying Rails with Docker, Kubernetes and ECS shows you how to set up the project, ' ||
        'push it to DockerHub, manage services and set up an efficient continuous integration environment. Every concept is clearly explained ' ||
        'alongside a full Ruby on Rails application deployment. You’ll also learn how to deploy via Docker using Amazon EC2 Container Service. ' ||
        'What You Will Learn How to create a Rails API application using Rails 5 and PostgreSQL, and Dockerize it How to write and test templates ' ||
        'to run the application with Kubernetes How to create a Kubernetes cluster in Amazon Web Services and run your How to inspect and troubleshoot ' ||
        'problems in the cluster How to automatize the the whole deployment process with Jenkins Who This Book Is For This book is for anyone who wants ' ||
        'to understand how to effectively deploy a Rails application using Docker and Kubernetes. You will need to understand Rails and have basic knowledge ' ||
        'of what Docker and Kubernetes are used for.', '9781484224144', '2017-12-31T00:00:00.000+0000', 'Deploying Rails with Docker, Kubernetes and ECS');
INSERT INTO book_details_authors ("book_details_id", "author_id") VALUES (3, 5);
INSERT INTO book_details_categories ("book_details_id", "category_id") VALUES (3, 1);


INSERT INTO author (author_full_name) VALUES ('Scott Chacon');
INSERT INTO "book" ("cover_picture_url", "description", "isbn", "publication_date", "title")
VALUES ('http://books.google.com/books/content?id=qJsXefpx1AUC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
        'Git is the version control system developed by Linus Torvalds for Linux kernel development. ' ||
        'It took the open source world by storm since its inception in 2005, and is used by small development shops and giants ' ||
        'like Google, Red Hat, and IBM, and of course many open source projects. A book by Git experts to turn you into a ' ||
        'Git expert Introduces the world of distributed version control Shows how to build a Git development workflow',
        '9781430218333', '2009-12-31T00:00:00.000+0000', 'Pro Git');
INSERT INTO book_details_authors ("book_details_id", "author_id") VALUES (4, 6);
INSERT INTO book_details_categories ("book_details_id", "category_id") VALUES (4, 1);


INSERT INTO author (author_full_name) VALUES ('Project Management Institute');
INSERT INTO "book" ("cover_picture_url", "description", "isbn", "publication_date", "title")
VALUES ('http://books.google.com/books/content?id=Tdv0vQEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
        'The Project Management Institute, Inc. (PMI) standards and guideline publications, of which the document ' ||
        'contained herein is one, are developed through a voluntary consensus standards development process. ' ||
        'This process brings together volunteers and/or seeks out the views of persons who have an interest in ' ||
        'the topic covered by this publication. While PMI administers the process and establishes rules to promote ' ||
        'fairness in the development of consensus, it does not write the document and it does not independently test, ' ||
        'evaluate, or verify the accuracy or completeness of any information or the soundness of any judgments contained ' ||
        'in its standards and guideline publications. PMI disclaims liability for any personal injury, property or other ' ||
        'damages of any nature whatsoever, whether special, indirect, consequential or compensatory, directly or indirectly ' ||
        'resulting from the publication, use of application, or reliance on this document.','9781628251999', '2017-12-31T00:00:00.000+0000',
        'Agile Practice Guide, Project Management Institute, 2017');
INSERT INTO book_details_authors ("book_details_id", "author_id") VALUES (5, 7);
INSERT INTO book_details_categories ("book_details_id", "category_id") VALUES (5, 1);


INSERT INTO author (author_full_name) VALUES ('Cameron Newham');
INSERT INTO author (author_full_name) VALUES ('Bill Rosenblatt');
INSERT INTO "book" ("cover_picture_url", "description", "isbn", "publication_date", "title")
VALUES ('http://books.google.com/books/content?id=dNabAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
        'O''Reilly''s bestselling book on Linux''s bash shell is at it again. Now that Linux is an established ' ||
        'player both as a server and on the desktop Learning the bash Shell has been updated and refreshed to ' ||
        'account for all the latest changes. Indeed, this third edition serves as the most valuable guide yet to ' ||
        'the bash shell. As any good programmer knows, the first thing users of the Linux operating system come face ' ||
        'to face with is the shell the UNIX term for a user interface to the system. In other words, it''s what lets you ' ||
        'communicate with the computer via the keyboard and display. Mastering the bash shell might sound fairly simple but ' ||
        'it isn''t. In truth, there are many complexities that need careful explanation, which is just what Learning the ' ||
        'bash Shell provides. If you are new to shell programming, the book provides an excellent introduction, covering ' ||
        'everything from the most basic to the most advanced features. And if you''ve been writing shell scripts for years, ' ||
        'it offers a great way to find out what the new shell offers. Learning the bash Shell is also full of practical examples ' ||
        'of shell commands and programs that will make everyday use of Linux that much easier. With this book, programmers will ' ||
        'learn: How to install bash as your login shell The basics of interactive shell use, including UNIX file and directory ' ||
        'structures, standard I/O, and background jobs Command line editing, history substitution, and key bindings How to customize ' ||
        'your shell environment without programming The nuts and bolts of basic shell programming, flow control structures, command-line ' ||
        'options and typed variables Process handling, from job control to processes, coroutines and subshells Debugging techniques, such ' ||
        'as trace and verbose modes Techniques for implementing system-wide shell customization and features related to system security',
        '9780596009656', '2005-12-31T00:00:00.000+0000', 'Learning the Bash Shell');
INSERT INTO book_details_authors ("book_details_id", "author_id") VALUES (6, 8);
INSERT INTO book_details_authors ("book_details_id", "author_id") VALUES (6, 9);
INSERT INTO book_details_categories ("book_details_id", "category_id") VALUES (6, 1);


INSERT INTO author (author_full_name) VALUES ('Juha Hinkula');
INSERT INTO "book" ("cover_picture_url", "description", "isbn", "publication_date", "title")
VALUES (null, 'Develop efficient and modern full-stack applications using Spring Boot and React 16 Key Features Develop' ||
        ' resourceful backends using Spring Boot and faultless frontends using React. Explore the techniques' ||
        ' involved in creating a full-stack app by going through a methodical approach. Learn to add CRUD functionalities' ||
        ' and use Material UI in the user interface to make it more user-friendly. Book Description Apart from knowing how' ||
        ' to write frontend and backend code, a full-stack engineer has to tackle all the problems that are encountered in' ||
        ' the application development life cycle, starting from a simple idea to UI design, the technical design, and all ' ||
        'the way to implementing, testing, production, deployment, and monitoring. This book covers the full set of technologies ' ||
        'that you need to know to become a full-stack web developer with Spring Boot for the backend and React for the frontend. ' ||
        'This comprehensive guide demonstrates how to build a modern full-stack application in practice. This book will teach you ' ||
        'how to build RESTful API endpoints and work with the data access Layer of Spring, using Hibernate as the ORM.',
        '9781789138085', '2018-12-31T00:00:00.000+0000', 'Hands-On Full Stack Development with Spring Boot 2.0 and React');
INSERT INTO book_details_authors ("book_details_id", "author_id") VALUES (7, 10);
INSERT INTO book_details_categories ("book_details_id", "category_id") VALUES (7, 1);

INSERT INTO author (author_full_name) VALUES ('Rajesh Rv');
INSERT INTO "book" ("cover_picture_url", "description", "isbn", "publication_date", "title")
VALUES ('http://books.google.com/books/content?id=7Gu7DAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
        null, '9781786466686', '2016-12-31T00:00:00.000+0000', 'Spring Microservices');
INSERT INTO book_details_authors ("book_details_id", "author_id") VALUES (8, 11);
INSERT INTO book_details_categories ("book_details_id", "category_id") VALUES (8, 1);

INSERT INTO author (author_full_name) VALUES ('Pranav Shukla');
INSERT INTO author (author_full_name) VALUES ('Sharath Kumar M. N.');
INSERT INTO "book" ("cover_picture_url", "description", "isbn", "publication_date", "title")
VALUES ('http://books.google.com/books/content?id=hid2swEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api',
        'Deliver end-to-end real-time distributed data processing solutions by leveraging the power of ' ||
        'Elastic Stack 6.0 Key Features - Get to grips with the new features introduced in Elastic Stack 6.0 - ' ||
        'Get valuable insights from your data by working with the different components of the Elastic stack such as ' ||
        'Elasticsearch, Logstash, Kibana, X-Pack, and Beats - Includes handy tips and techniques to build, deploy ' ||
        'and manage your Elastic applications efficiently on-premise or on the cloud Book Description The Elastic Stack is' ||
        ' a powerful combination of tools for distributed search, analytics, logging, and visualization of data from medium ' ||
        'to massive data sets. The newly released Elastic Stack 6.0 brings new features and capabilities that empower users ' ||
        'to find unique, actionable insights through these techniques. This book will give you a fundamental understanding of ' ||
        'what the stack is all about, and how to use it efficiently to build powerful real-time data processing applications. ' ||
        'After a quick overview of the newly introduced features in Elastic Stack 6.0, you''ll learn how to set up the stack ' ||
        'by installing the tools, and see their basic configurations. Then it shows you how to use Elasticsearch for distributed ' ||
        'searching and analytics, along with Logstash for logging, and Kibana for data visualization. It also demonstrates the' ||
        ' creation of custom plugins using Kibana and Beats. You''ll find out about Elastic X-Pack, a useful' ||
        ' extension for effective security and monitoring. We also provide useful tips on how to use the Elastic Cloud and ' ||
        'deploy the Elastic Stack in production environments. On completing this book, you''ll have a solid foundational knowledge' ||
        ' of the basic Elastic Stack functionalities.', '9781787281868', '2017-12-31T00:00:00.000+0000', 'Learning Elastic Stack 6.0');
INSERT INTO book_details_authors ("book_details_id", "author_id") VALUES (9, 12);
INSERT INTO book_details_authors ("book_details_id", "author_id") VALUES (9, 13);
INSERT INTO book_details_categories ("book_details_id", "category_id") VALUES (9, 1);


INSERT INTO author (author_full_name) VALUES ('Steven Feuerstein');
INSERT INTO author (author_full_name) VALUES ('Bill Pribyl');
INSERT INTO "book" ("cover_picture_url", "description", "isbn", "publication_date", "title")
VALUES ('https://itbook.store/img/books/9781449324452.png',
        'Considered the best Oracle PL/SQL programming guide by the Oracle community, this definitive guide ' ||
        'is precisely what you need to make the most of Oracle''s powerful procedural language. The sixth ' ||
        'edition describes the features and capabilities of PL/SQL up through Oracle Database 12c ' ||
        'Release 1.Hundre...', '9781449324452', '2014-12-31T00:00:00.000+0000', 'Oracle PL/SQL Programming, 6th Edition');
INSERT INTO book_details_authors ("book_details_id", "author_id") VALUES (10, 14);
INSERT INTO book_details_authors ("book_details_id", "author_id") VALUES (10, 15);
INSERT INTO book_details_categories ("book_details_id", "category_id") VALUES (10, 1);

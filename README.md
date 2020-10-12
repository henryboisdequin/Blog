# Blog

A fullstack blog site combing some features of Reddit and Medium.

### Tech Stack:

- React
- TypeScript
- GraphQL/TypeGraphQL
- URQL
- Node.js
- PostgreSQL
- TypeORM
- Redis
- Next.js
- Chakra
- Formik
- DataLoader

### Features

- Secure login/register/logout experience (cookies/sessions)
- Change password with email link
- Ability to post blog posts
- Upvote/downvote blog posts
- Edit blog posts
- Delete blog posts
- Custom 404 Page

### To Run

Needed: Node.js, yarn, git, postgreSQL, redis

1. Clone project

```
git clone https://github.com/henryboisdequin/Blog.git
cd Blog/
```

2. Install Dependencies

```
yarn
```

3. Start PostgreSQL with Username: postgres and Password: postgres

```
createdb blog2
```

4. Install and Start Redis
   <a href="https://www.youtube.com/watch?v=JGvbEk4jtrU">YouTube Installation of Redis Tutorial</a>

5. Start Server

1st Terminal:

```
cd server/
yarn watch
```

2nd Terminal:

```
cd server/
yarn dev
```

6. Start Frontend

```
cd client/
yarn dev
```

You should now see a fully functioning Blog site!

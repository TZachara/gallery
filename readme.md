# Gallery

Application to manage photos.

# Requirements

Target is to create a REST API that would allow to:
• Add photos

• Preview of a list of photos

• Create albums

• Preview of list of albums

• Adding photo to an album

As a part of this task, provide documentation that would allow to:

• lunch app

• check endpoints

# Installation

After downloading, install all dependencies.

```npm
npm install
```

Before Lunching app make sure that local MongoDB is running.

To Lunch App

```npm
node server.js
```

# Photo Endpoints

GET

```http
/photos                   # get all photos
/photos/:photo_id         # get photo details by id
/photos/link/:photo_id    # get photo's content
```

POST

```http
/photos                   # Upload photo
```

DELETE

```http
/photos                   # Delete photo
```

# Albums Endpoints

GET

```http
/albums                   # get all albums
/albums/:album_id         # get album details by id
/photos/link/:photo_id    # get photo's content
```

POST

```http
/albums                   # Create alum
```

PUT

```http
/albums                   # Update album's name
/albums/:album_id/photo  # Add Photo to Album
```

DELETE

```http
/albums                   # Delete album
/albums/:album_id/photo  # Delete Photo from Album
```

# Internal API Documentation

## Endpoints

### POST /api/upload

Internal endpoint that strictly accepts a FormData object containing an EPUB file.

#### Request Requirements

- Method: `POST`
- Body: Must be a `FormData` object
- The FormData object must contain a `File` object that:
  - Is less than 90 megabytes
  - Has MIME type `application/epub+zip`

#### Example Request

```javascript
// Correct usage
const formData = new FormData();
formData.append('file', epubFile);  // epubFile must be a File object

await fetch('/api/upload', {
  method: 'POST',
  body: formData  // Must pass FormData directly, not JSON or other formats
});

// Invalid - will be rejected
await fetch('/api/upload', {
  method: 'POST',
  body: JSON.stringify({ file: epubFile })  // Wrong: Don't stringify or wrap in JSON
});
```

#### Responses

##### Success Response

```json
{
  "success": true,
  "message": "File uploaded successfully"
}
```

##### Error Responses

```json
// 400 Bad Request
{
  "error": "Request body must be FormData"
}

// 400 Bad Request
{
  "error": "FormData must contain a file"
}

// 413 Payload Too Large
{
  "error": "File must be less than 90MB"
}

// 415 Unsupported Media Type
{
  "error": "File must be an EPUB (application/epub+zip)"
}
```

## Lab 02 - Simple Express Server

### Routes

#### 1. **Get Greeting**

**Endpoint**: `Get /greeting`

**Description:** Returns a random greeting

**Example Request:**
```http
GET /greeting -> Greetings
GET /greeting -> Good morning
GET /greeting -> Howdy doody
```

#### 2. **Get Name**

**Endpoint**: `Get /name`

**Description:** Returns the name of user (with a touch of greeting😋)

**Parameters**
- `name` (optional): Name of the person to return. Default is **Harman**

**Example Request:**
```http
GET /name -> Greetings Harman
GET /name/user -> Good morning user
GET /name/garry -> Howdy doody garry
```

#### 3. **Add**

**Endpoint**: `Post /add`

**Description:** Adds 2 numbers (x & y)

**Query Params**
- `x` : number (default 5)
- `y` : number (default 5)

**Example Request:**
```http
POST /add?x=5&y=10 -> 15
```

#### 3. **Calculate**

**Endpoint**: `Post /calculate`

**Description:** Do Add, Sub, Div, Multi, Expo calculations

**Query Params**
- `a` : number (default 5)
- `b` : number (default 5)

**Example Request:**
```http
POST /calculate?a=5&b=10
```
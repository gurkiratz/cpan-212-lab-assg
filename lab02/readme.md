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

#### 4. **Calculate**

**Endpoint**: `Post /calculate`

**Description:** Perform Addition, Subtraction, Division, Multiplication operations

**Query Params**
- `a` : number (default 5)
- `b` : number (default 7)
- `calc` : string (use `%2B` for `+`, `%2D` for `-`, `%2A` for `*`, and `%2F` for `/`)

**Example Request:**
- **Addition**
```bash
curl -X POST "http://localhost:3000/calculate?a=5&b=10&calc=%2B"
# 15
```
- **Subtraction**
```bash
curl -X POST "http://localhost:3000/calculate?a=10&b=5&calc=%2D"
# output 5
```
- **Multiplication**
```bash
curl -X POST "http://localhost:3000/calculate?a=5&b=10&calc=%2A"
# output 50
```
- **Division**
```bash
curl -X POST "http://localhost:3000/calculate?a=10&b=5&calc=%2F"
# output 2
```
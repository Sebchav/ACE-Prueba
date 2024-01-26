from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import get_all_users, create_user, delete_user, get_one_user_id, delete_last_user_from_db
from models import User, PyObjectId

app = FastAPI()

# Configura el middleware CORS
origins = [
    "http://localhost:3000",
    "https://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def welcome():
    return {'message': 'Welcome to my FastAPI'}

@app.get("/api/users")
async def get_users():
    users = await get_all_users()
    return users

@app.post("/api/user", response_model=User)
async def save_user(user: User):
    response = await create_user(user.model_dump())
    if response:
        # Convierte el valor del campo _id a PyObjectId
        response['_id'] = PyObjectId(response['_id'])
        return User(**response)
    raise HTTPException(400, "No se pudo guardar el usuario")


@app.get("/api/user/{id}")
async def get_user(id: str):
    user = await get_one_user_id(id)
    if user:
        return user
    return HTTPException(404, "Usuario no encontrado")


@app.delete("/api/user/{id}")
async def deleting_user(id: str):
    result = await delete_user(id)
    
    if result["message"]:
        return result
    
    raise HTTPException(404, result["message"])

@app.delete("/api/user/last")
async def delete_last_user():
    result = await delete_last_user_from_db()
    return result
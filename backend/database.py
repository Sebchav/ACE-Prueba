from motor.motor_asyncio import AsyncIOMotorClient
from decouple import config
from fastapi import HTTPException
from models import User, PyObjectId

uri = config("MONGO_URI")

client = AsyncIOMotorClient(uri)
database = client.ace
collection = database.users

async def get_all_users():
    users = []
    cursor = collection.find({})
    async for document in cursor:
        # Convierte el campo _id a PyObjectId
        document['_id'] = PyObjectId(document['_id'])
        users.append(User(**document))
    return users


async def delete_user(id: str):
    user_id = PyObjectId(id)
    result = await collection.delete_one({"_id": user_id})

    if result.deleted_count == 1:
        return {"message": f"Usuario con ID {id} eliminado correctamente"}
    
    raise HTTPException(status_code=404, detail=f"No se encontró un usuario con ID {id}")


async def get_one_user_id(id: str):
    # Convierte el string ID a un ObjectId
    user_id = PyObjectId(id)
    user = await collection.find_one({"_id": user_id})
    
    if user:
        # Convierte el campo _id a PyObjectId
        user['_id'] = PyObjectId(user['_id'])
        return User(**user)
    
    return None


async def create_user(user):
    new_user = await collection.insert_one(user)
    created_user = await collection.find_one({"_id": new_user.inserted_id})
    return created_user


async def delete_last_user_from_db():
    result = await collection.find_one_and_delete({}, sort=[("_id", -1)])

    if result:
        return {"message": f"Usuario con ID {result['_id']} eliminado correctamente"}
    else:
        return {"message": "No hay usuarios para eliminar"}
from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators_(cls):
        yield cls.validate
    
    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid object id")
        return str(v)

class User(BaseModel):
    id: Optional[PyObjectId] = Field(alias='_id', default=None)
    name: str
    age: int

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {
            ObjectId: lambda x: str(x)
        }

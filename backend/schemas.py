from pydantic import BaseModel

class ProductCreate(BaseModel):
    name: str
    description: str
    price: float
    category: str
    image_url: str


class ProductResponse(ProductCreate):
    id: int

    class Config:
        from_attributes = True
class AdminLogin(BaseModel):
    username: str
    password: str
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)
from sqlalchemy.orm import Session

from database import engine, SessionLocal
from models import Base, Product
from schemas import ProductCreate, AdminLogin

Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "Drisora Backend Running"}


@app.post("/products")
def create_product(product: ProductCreate):

    db: Session = SessionLocal()

    new_product = Product(
        name=product.name,
        description=product.description,
        price=product.price,
        category=product.category,
        image_url=product.image_url
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return {
        "message": "Product Added Successfully",
        "product_id": new_product.id
    }
@app.get("/products")
def get_products(category: str = None):

    db: Session = SessionLocal()

    if category:
        return (
            db.query(Product)
            .filter(Product.category == category)
            .all()
        )

    return db.query(Product).all()
@app.delete("/products/{product_id}")
def delete_product(product_id: int):

    db: Session = SessionLocal()

    product = db.query(Product).filter(
        Product.id == product_id
    ).first()

    if not product:
        return {"message": "Product Not Found"}

    db.delete(product)
    db.commit()

    return {"message": "Product Deleted Successfully"}
@app.put("/products/{product_id}")
def update_product(product_id: int, product: ProductCreate):

    db: Session = SessionLocal()

    existing_product = (
        db.query(Product)
        .filter(Product.id == product_id)
        .first()
    )

    if not existing_product:
        return {"message": "Product Not Found"}

    existing_product.name = product.name
    existing_product.description = product.description
    existing_product.price = product.price
    existing_product.category = product.category
    existing_product.image_url = product.image_url

    db.commit()

    return {
        "message": "Product Updated Successfully"
    }
@app.post("/login")
def login(admin: AdminLogin):

    if (
        admin.username == "disha"
        and admin.password == "drisora123"
    ):
        return {
            "success": True,
            "message": "Login Successful"
        }

    return {
        "success": False,
        "message": "Invalid Username or Password"
    }
from sqlalchemy.orm import Session
from backend.models.database_models import User

def create_user(

    db: Session,

    username,

    email,

    password
):

    user = User(

        username=username,

        email=email,

        password=password
    )

    db.add(user)

    db.commit()

    db.refresh(user)

    return user

def get_user_by_email(

    db: Session,

    email
):

    return db.query(User).filter(

        User.email == email

    ).first()
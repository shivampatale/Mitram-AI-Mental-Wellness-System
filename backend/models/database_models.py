from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import Text

from backend.database.db import Base


class User(Base):

    __tablename__ = "users"

    id = Column(

        Integer,

        primary_key=True,

        index=True
    )

    username = Column(String)

    email = Column(

        String,

        unique=True
    )

    password = Column(String)


class Assessment(Base):

    __tablename__ = "assessments"

    id = Column(

        Integer,

        primary_key=True,

        index=True
    )

    user_email = Column(String)

    wellness_score = Column(Float)

    risk = Column(String)

    insights = Column(Text)

    recommendations = Column(Text)

    created_at = Column(String)
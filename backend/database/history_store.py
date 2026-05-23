from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column,Integer,String
from sqlalchemy import Boolean
from sqlalchemy import DateTime
from datetime import datetime

DATABASE_URL="sqlite:///mitram.db"

engine=create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread":False}
)

SessionLocal=sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base=declarative_base()


class Assessment(Base):

    __tablename__="assessments"

    id=Column(Integer,primary_key=True,index=True)

    user_email = Column(String)

    wellness_score=Column(Integer)

    risk=Column(String)

    recommendations=Column(String)

    insights=Column(String)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    username = Column(
        String,
        unique=True,
        nullable=False
    )

    email = Column(
        String,
        unique=True,
        nullable=False
    )

    password = Column(
        String,
        nullable=False
    )

    is_active = Column(
        Boolean,
        default=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )


Base.metadata.create_all(bind=engine)


def save_assessment(data):

    db=SessionLocal()

    assessment=Assessment(

    user_email= data["user_email"],

    wellness_score= data["wellness_score"],

    risk= data["risk"],

    recommendations=" | ".join(data["recommendations"]),

    insights=" | ".join(data["insights"])

 )

    db.add(assessment)
    db.commit()
    db.close()



def get_history(email):

    db=SessionLocal()

    records=db.query(Assessment).filter(Assessment.user_email==email).all()

    result=[]

    for row in records:
        result.append(
            {
                "wellness_score":row.wellness_score,

                "risk":row.risk,

                "recommendations":row.recommendations.split(" | ") if row.recommendations else [],

                "insights":row.insights.split(" | ") if row.insights else[],

                "created_at": row.created_at.strftime("%d-%m-%Y %H:%M")
            }
        )

    db.close()

    return result
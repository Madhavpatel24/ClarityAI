from sqlalchemy import create_engine, Column, String, Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy.orm import relationship
from datetime import datetime

DATABASE_URL = "sqlite:///./clarity.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)
Base = declarative_base()


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)




class AnalysisRecord(Base):
    __tablename__ = "analyses"

    id = Column(String, primary_key=True, index=True)

    user_id = Column(String, ForeignKey("users.id"))   # ✅ ADD THIS

    input_type = Column(String)
    input_length = Column(Integer)
    result_json = Column(Text)
    original_file = Column(String, nullable=True)
    critical = Column(Integer)
    warnings = Column(Integer)

    created_at = Column(DateTime, default=datetime.utcnow)


def init_db():
    Base.metadata.create_all(bind=engine)
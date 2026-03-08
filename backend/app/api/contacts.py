from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas, database

router = APIRouter(prefix="/api/contacts", tags=["Контакты"])

@router.post("/", response_model=schemas.ContactResponse)
def submit_contact_form(contact: schemas.ContactCreate, db: Session = Depends(database.get_db)):
    new_contact = models.Contact(**contact.dict())
    db.add(new_contact)
    db.commit()
    db.refresh(new_contact)
    return new_contact

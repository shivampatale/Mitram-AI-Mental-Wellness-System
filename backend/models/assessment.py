from pydantic import BaseModel
from typing import Dict

class AssessmentInput(BaseModel):

    email : str

    answers: Dict[str, int]
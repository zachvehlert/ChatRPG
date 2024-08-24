from pydantic import BaseModel

class DMresponse(BaseModel):
    dm_response: str

    health_change: int
    gold_change: int

    items_added: list[str]
    items_lost: list[str]
    usable_items: list[str]

    dice_roll_required: bool
    roll_for_skill: str
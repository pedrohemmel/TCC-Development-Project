from dataclasses import dataclass
from datetime import datetime, date, time, timedelta

@dataclass
class device_model:
    id_device: str
    first_seen: datetime
    last_seen: datetime
    dwell_time: int

from enum import Enum

class alert_event_model(Enum):
    CRITICAL_RISK_AREA = "Critical risk area... Call security!"
    RISK_AREA = "Risk area report, keep security close."
    CROWDED_AREA = "Crowded area report."
    SAFE_AREA = "It's safe..."
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from datetime import datetime, timedelta

SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"]

def get_calendar_events():
    """Fetch events from Google Calendar for today and next 7 days."""
    creds = Credentials.from_authorized_user_file("token.json", SCOPES)
    service = build("calendar", "v3", credentials=creds)

    now = datetime.utcnow().isoformat() + "Z"
    week_end = (datetime.utcnow() + timedelta(days=7)).isoformat() + "Z"

    events_result = service.events().list(
        calendarId="primary",
        timeMin=now,
        timeMax=week_end,
        singleEvents=True,
        orderBy="startTime"
    ).execute()

    events = events_result.get("items", [])

    return [
        {
            "title": e.get("summary", "Busy"),
            "start": e["start"].get("dateTime", e["start"].get("date")),
            "end": e["end"].get("dateTime", e["end"].get("date")),
        }
        for e in events
    ]
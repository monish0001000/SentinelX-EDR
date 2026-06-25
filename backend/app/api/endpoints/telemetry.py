"""
SentinelX EDR - Telemetry API
"""

from typing import Dict, Any, List
from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.telemetry import TelemetryIngest
from app.services.telemetry_service import ingest_telemetry, get_endpoint_telemetry_summary

router = APIRouter()

@router.post("/ingest")
def ingest_data(data: TelemetryIngest, background_tasks: BackgroundTasks, db: Session = Depends(get_db)) -> Any:
    """
    Ingest a batch of telemetry from an OSQuery agent.
    In a high-throughput production system, this would push to Kafka/Redis.
    Here we write directly to DB synchronously for simplicity.
    """
    counts = ingest_telemetry(db, data)
    
    # Trigger detection engine in background
    # background_tasks.add_task(run_detection, data.model_dump())
    
    return {"status": "success", "inserted": counts}

@router.get("/{endpoint_id}/summary")
def get_summary(endpoint_id: str, db: Session = Depends(get_db)) -> Any:
    """Get counts of collected telemetry for an endpoint."""
    return get_endpoint_telemetry_summary(db, endpoint_id)

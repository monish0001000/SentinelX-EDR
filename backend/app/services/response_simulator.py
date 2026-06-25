"""
SentinelX EDR - Response Simulator Service
===========================================
Simulates incident response actions without affecting real endpoints.
"""

from typing import Dict, Any, List, Optional
from datetime import datetime, timezone
from sqlalchemy.orm import Session

from app.models.endpoint import Endpoint

def simulate_response(db: Session, action_type: str, target: str, endpoint_id: str) -> Dict[str, Any]:
    """
    Simulate an incident response action.
    
    Valid action_types:
    - isolate_endpoint
    - kill_process
    - block_ip
    - disable_user
    - quarantine_file
    """
    
    endpoint = db.query(Endpoint).filter(Endpoint.id == endpoint_id).first()
    
    status = "simulated"
    outcome = ""
    
    if action_type == "isolate_endpoint":
        if endpoint:
            endpoint.is_isolated = True
            db.commit()
            outcome = f"Endpoint {endpoint.hostname} network connections blocked except to EDR management."
        else:
            status = "failed"
            outcome = "Endpoint not found."
            
    elif action_type == "kill_process":
        outcome = f"Sent SIGKILL to process {target} on {endpoint.hostname if endpoint else endpoint_id}."
        
    elif action_type == "block_ip":
        outcome = f"Added Windows Firewall block rule for IP {target}."
        
    elif action_type == "disable_user":
        outcome = f"Disabled local user account {target}."
        
    elif action_type == "quarantine_file":
        outcome = f"Moved file {target} to quarantine encrypted archive."
        
    else:
        status = "failed"
        outcome = f"Unknown action type: {action_type}"
        
    return {
        "action": action_type,
        "target": target,
        "endpoint_id": endpoint_id,
        "status": status,
        "expected_outcome": outcome,
        "timestamp": datetime.now(timezone.utc).isoformat()
    }

def get_response_log(db: Session, endpoint_id: Optional[str] = None) -> List[Dict[str, Any]]:
    # In a real system, we'd query an AuditLog table here.
    # For simulation, we return a static placeholder.
    return [
        {
            "action": "isolate_endpoint",
            "target": "all",
            "endpoint_id": endpoint_id or "demo-1",
            "status": "simulated",
            "expected_outcome": "Endpoint isolated from network",
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
    ]

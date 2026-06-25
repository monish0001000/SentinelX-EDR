"""
SentinelX EDR - WebSocket API
"""

from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import Any

from app.core.websocket_manager import ws_manager as manager

router = APIRouter()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket) -> Any:
    # Accept without specific endpoint_id for dashboard global view
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Handle incoming messages (e.g., ping/pong or filter updates) if needed
            if data == "ping":
                await websocket.send_text("pong")
    except WebSocketDisconnect:
        manager.disconnect(websocket)

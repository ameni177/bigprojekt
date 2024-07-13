import React from "react";
import { JitsiMeeting } from "@jitsi/react-sdk";
import './JitsiMeetComponent.css';

const JitsiMeetComponent = () => {
    const roomName = "Konferenz";
    const domain = "meet.ffmuc.net";

    return (
        <div className="live">
        <JitsiMeeting
            roomName={roomName}
            displayName={"test"}
            domain={domain}
            containerStyles={{display: "flex", flex: 1}}
        />
    </div>
    );
};

export default JitsiMeetComponent;
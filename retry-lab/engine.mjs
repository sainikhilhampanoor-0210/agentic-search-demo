export function simulate(events,deadline,maxAttempts){
 if(!Array.isArray(events)||!events.length||events.length>50||events.some(e=>!e||!["ok","busy","timeout","denied"].includes(e.outcome)||!Number.isInteger(e.ms)||e.ms<1||e.ms>10000)||!Number.isInteger(deadline)||deadline<1||![1,3].includes(maxAttempts))throw Error("Use 1–50 events with outcome ok, busy, timeout or denied and duration 1–10,000 ms.");
 let elapsed=0;const rows=[];const end=status=>({status,elapsed,rows});
 for(let i=0;i<maxAttempts;i++){if(i>=events.length)return end("Trace exhausted");const delay=i?200*2**(i-1):0;if(elapsed+delay>=deadline){rows.push(["Backoff",deadline-elapsed,"Deadline reached"]);elapsed=deadline;return end("Deadline reached");}if(delay){elapsed+=delay;rows.push(["Backoff",delay,"Retry scheduled"]);}
 const e=events[i];if(elapsed+e.ms>deadline){rows.push(["Attempt "+(i+1),deadline-elapsed,"Interrupted"]);elapsed=deadline;return end("Deadline reached");}elapsed+=e.ms;rows.push(["Attempt "+(i+1),e.ms,e.outcome]);if(e.outcome==="ok")return end("Completed");if(e.outcome==="denied")return end("Review required");}
 return end("Attempt limit reached");
}

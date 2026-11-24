export const scenarios={valid:[["lookup","A1042"],["approve","A1042"],["return","A1042"]],wrong:[["lookup","A1042"],["lookup","B2077"],["approve","B2077"],["return","A1042"]],early:[["lookup","A1042"],["return","A1042"]],duplicate:[["lookup","A1042"],["approve","A1042"],["return","A1042"],["return","A1042"]]};
export function replay(trace){
 if(!Array.isArray(trace)||!trace.length||trace.length>100)throw Error("Enter 1–100 steps as a JSON array.");
 const seen=new Set(),approved=new Set(),returned=new Set(),rows=[];
 for(const step of trace){if(!Array.isArray(step)||step.length!==2||step.some(v=>typeof v!=="string"))throw Error("Each step needs two strings: action and order ID.");
 const [action,id]=step;let error="";
 if(!/^[A-Z][0-9]{4}$/.test(id))error="Expected an order ID such as A1042.";
 else if(!["lookup","approve","return"].includes(action))error="Unknown action.";
 else if(action==="lookup")seen.add(id);
 else if(!seen.has(id))error="Look up this order first.";
 else if(action==="approve")approved.add(id);
 else if(returned.has(id))error="This return was already issued.";
 else if(!approved.has(id))error="Missing approval for this order.";
 else returned.add(id);
 rows.push([rows.length+1,action,id,error||"Passed"]);if(error)return {pass:false,rows,issued:[...returned]};}
 return {pass:true,rows,issued:[...returned]};
}

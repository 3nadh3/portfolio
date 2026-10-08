import {myInfo} from './data';
const contact=`[email Trinadh](mailto:${myInfo.email}) or [message him on LinkedIn](${myInfo.linkedin})`;
export const failureMessage=`The assistant could not reply right now. Please try again. If it continues, ${contact} so he can fix it.`;

export function chatErrorMessage(status:number,data:unknown):string {
  const details=data&&typeof data==='object'?data as {code?:unknown;quota?:{scope?:unknown;retryAfterSeconds?:unknown}}:{};
  if(details.code==='PROVIDER_QUOTA_UNAVAILABLE')return `The AI provider has no available quota for this chatbot right now. Please ${contact} so he can check the service. Waiting a minute may not resolve it.`;
  if(details.code==='PROVIDER_DAILY_QUOTA_EXHAUSTED'||(status===429&&details.quota?.scope==='daily'))return `The chatbot has used its daily AI allowance. It will be available after the provider’s daily reset. You can ${contact} in the meantime.`;
  if(status===429||details.code==='PROVIDER_RATE_LIMITED') {
    const seconds=details.quota?.retryAfterSeconds;
    if(typeof seconds==='number'&&Number.isFinite(seconds)&&seconds>0&&seconds<=86400)return `The AI provider is temporarily limiting requests. Please try again in about ${Math.ceil(seconds)} seconds. If it continues, ${contact}.`;
    return `The AI provider has reached a usage limit. This may be a minute or daily allowance. Please try again later, or ${contact} if it continues.`;
  }
  return failureMessage;
}

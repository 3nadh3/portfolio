import content from './content.json';
export type Project=typeof content.projects[number];
export const {projects,skills,profileViews}=content;
export const myInfo={name:'Trinadh Musunuri',email:'trinadh.musunuri@gmail.com',github:'https://github.com/3nadh3',linkedin:'https://www.linkedin.com/in/trinadh-musunuri/'};
const media='https://raw.githubusercontent.com/shamihsnn/netflix-portfolio/6f691190bebcbcae9a16ec7bcf092201ff5eb71f/public/video/';
export const profiles=[{type:'Recruiter',avatar:'27c510dc-dc9f-4470-a7b9-34279eb80bca.jpeg',video:'./background.mp4'},{type:'Developer',avatar:'c475c34c-8f67-467b-a5d4-f5421e323810.jpg',video:media+'coding.mp4'},{type:'Stalker',avatar:'1f10192c-5884-49ba-b201-08f2144721b6.jpg',video:media+'stalker.mp4'},{type:'Adventurer',avatar:'825adb96-f01f-42ec-8650-1bbaebffd433.jpg',video:media+'adventurer-background.mp4'}];
export const artwork=['./lovable-uploads/1f10192c-5884-49ba-b201-08f2144721b6.jpg','./lovable-uploads/c475c34c-8f67-467b-a5d4-f5421e323810.jpg','./lovable-uploads/825adb96-f01f-42ec-8650-1bbaebffd433.jpg','./lovable-uploads/27c510dc-dc9f-4470-a7b9-34279eb80bca.jpeg'];


export interface subtasks {
  id:number;

  titlesub: string;
  descriptionsub: string;
  
}
export interface Tags {
  tag:string;
  
}
export class Task { 
    id:number;
    title:string;    
    description:string;  
    categorie:string;
    type:string;
    subtasks:subtasks[];
    tags:Tags[];
    favoris:boolean;
   privacy:string;
  }
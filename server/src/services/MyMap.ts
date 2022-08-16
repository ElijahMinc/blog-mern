export class MyMap{
   private static instance: MyMap;

   map: Map<any, Map<any, any>> = new Map();

   private constructor(){}
   

   public static get(): MyMap{
      if(!MyMap.instance){
         MyMap.instance = new MyMap();
      }

      return MyMap.instance;
   }
}
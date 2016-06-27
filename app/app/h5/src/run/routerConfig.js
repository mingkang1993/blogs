/**
 * Created by kangdaye on 16/6/24.
 */
export default{
   routerDefault : {
      url : '/',
      getComponent : () => {
         require('../container/a');
      },
      defaultGetIndexComponent : require('../container/c')
   },
   router : [
      {
         url : 'type.html',
         getComponent : () => {
            require('../container/type/typeList.jsx')
         }
      },
      {
         url : 'type1.html',
         getComponent : () => {
            require('../container/c')
         }
      }
   ]
}

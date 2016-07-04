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
         path : 'type.html',
         getComponent : () => {
            require('../container/type/typeV.jsx')
         }
      },
      {
         path : 'type/list.html',
         getComponent : () => {
            require('../container/type/typeListV.jsx')
         }
      },
      {
         path : 'type1.html',
         getComponent : () => {
            require('../container/c')
         }
      }
   ]
}

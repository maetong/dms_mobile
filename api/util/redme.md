## 服务顾问的使用
```
import dictCode from '@/common/dictCode.js';
let consultant = { role: dictCode.SERVICE_CONSULTANT }; // 服务顾问
let technician = { role: dictCode.TECHNICIAN }; // 指定技师

await searchRoleByCode(consultant);
await searchRoleByCode(technician)

```
## Installation
1. Install package flask_jwt_extended
2. Provide JWT_SECRET_KEY env variable
3. Provide JWT_SECRET_KEY in config.py

### Front-end
Add the reference to the library to any jsx file to provide interceptor, currently, it's in src/shared/globalVars.js
```
import { JWTFunctions } from '@src/modules/jwt/JWTFunctions';
```

### Back-end
Change user_auth_wrapper.py (*/src/shared/utils*) if needed:
```
from flask_jwt_extended import jwt_required, get_jwt_identity
def login_required(func):
    # Replace this line
    return jwt_required(func)

# Replace this line if needed
current user = get_jwt_identity()
```
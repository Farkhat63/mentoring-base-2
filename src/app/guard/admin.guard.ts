import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthServiceService } from "../auth-service.service";

export const AdminGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const userService = inject(AuthServiceService)
    const router = inject(Router)

    if(userService.isAdmin()) {
        return true
    }

    return router.createUrlTree([""],
    )
}
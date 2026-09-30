import type { IAPIResponse } from '@/utils/interfaces.util';
import type AxiosService from '../base/axios';
import { ApiPath } from '../paths';

class CatalogueAPI {
    constructor(private axiosService: AxiosService) {}

    listPrograms(): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'GET',
            path: ApiPath.programs,
            isAuth: false,
            payload: {},
        });
    }

    createProgram(payload: Record<string, unknown>): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.adminPrograms,
            isAuth: true,
            payload,
        });
    }

    updateProgram(id: string, payload: Record<string, unknown>): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'PATCH',
            path: ApiPath.adminProgram(id),
            isAuth: true,
            payload,
        });
    }

    listEvents(programId: string): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'GET',
            path: ApiPath.adminEvents(programId),
            isAuth: true,
            payload: {},
        });
    }

    createEvent(programId: string, payload: Record<string, unknown>): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.adminEvents(programId),
            isAuth: true,
            payload,
        });
    }

    updateEvent(
        programId: string,
        eventId: string,
        payload: Record<string, unknown>,
    ): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'PATCH',
            path: ApiPath.adminEvent(programId, eventId),
            isAuth: true,
            payload,
        });
    }

    listCourses(): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'GET',
            path: ApiPath.adminCourses,
            isAuth: true,
            payload: {},
        });
    }

    createCourse(payload: Record<string, unknown>): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.adminCourses,
            isAuth: true,
            payload,
        });
    }

    updateCourse(id: string, payload: Record<string, unknown>): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'PATCH',
            path: ApiPath.adminCourse(id),
            isAuth: true,
            payload,
        });
    }

    listModules(courseId: string): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'GET',
            path: ApiPath.adminModules(courseId),
            isAuth: true,
            payload: {},
        });
    }

    createModule(courseId: string, payload: Record<string, unknown>): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'POST',
            path: ApiPath.adminModules(courseId),
            isAuth: true,
            payload,
        });
    }

    updateModule(
        courseId: string,
        moduleId: string,
        payload: Record<string, unknown>,
    ): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'PATCH',
            path: ApiPath.adminModule(courseId, moduleId),
            isAuth: true,
            payload,
        });
    }

    listScholarships(): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'GET',
            path: ApiPath.adminScholarships,
            isAuth: true,
            payload: {},
        });
    }

    patchScholarship(id: string, status: 'approved' | 'rejected'): Promise<IAPIResponse> {
        return this.axiosService.call({
            type: 'default',
            method: 'PATCH',
            path: ApiPath.adminScholarship(id),
            isAuth: true,
            payload: { status },
        });
    }
}

export default CatalogueAPI;

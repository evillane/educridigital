const Enviroment = {
    baseUrl : 'https://muniporvenirapisegsporv20220614195344.azurewebsites.net/',
    api : {
        trabajador : {
            default : '/api/trabajador',
            search : '/api/trabajador/search',
            deleteds : '/api/trabajador/deleteMany',
        },
        policia : {
            default : '/api/policia',
            search : '/api/policia/search',
            deleteds : '/api/policia/deleteMany',
        },
        general : {
            default : '/api/general',
            search : '/api/general/search',
            deleteds : '/api/general/deleteMany',
        },    
        tipomantenedor : {
            default : '/api/tipomantenedor',
            search : '/api/tipomantenedor/search',
            deleteds : '/api/tipomantenedor/deleteMany',
        },            
        tipoincidente : {
            default : '/api/tipoincidente',
            search : '/api/tipoincidente/search',
            deleteds : '/api/tipoincidente/deleteMany',
        },
        tipopuesto : {
            default : '/api/tipopuesto',
            search : '/api/tipopuesto/search',
            deleteds : '/api/tipopuesto/deleteMany',
        },
        incidente : {
            default : '/api/incidente',
            search : '/api/incidente/search',
            deleteds : '/api/incidente/deleteMany',
        },   
        incidencia : {
            default : '/api/incidencia',
            search : '/api/incidencia/search',
            deleteds : '/api/incidencia/deleteMany',
            report : '/api/incidencia/report',
        },    
        usuario : {
            default : '/api/user',
            search : '/api/user/search',
            deleteds : '/api/user/deleteMany',
        },    
        usuarioexterno : {
            default : '/api/ExternalUser',
            search : '/api/ExternalUser/search'
        },    
        perfil : {
            default : '/api/perfil',
        }, 
        perfilrol : {
            default : '/api/Perfil_Rol',
            search : '/api/Perfil_Rol/searchPerfilRol',
            deleteds : '/api/Perfil_Rol/deleteMany',
        },  
        rol : {
            default : '/api/Rol',
        },    
        ubicacion : {
            default : '/api/ubicacionmapa',
            search : '/api/ubicacionmapa/search',
            deleteds : '/api/ubicacionmapa/deleteMany',
        },                                          
    },
    baseUrlSecurity: 'https://muniporvenirapisecurity20220919190340.azurewebsites.net/',
    api2 : {
    security : {
        perfil_rol : '/api/Perfil_Rol/getPerfil_Rol',
    },    
    },
    baseUrlSignalRIncident:'https://muniporvenirapiincident20220919191433.azurewebsites.net/api/Test/hubs/IncidentHub',
    baseUrlSignalR: 'https://muniporvenirapiincident20220919191433.azurewebsites.net/',
    apisig : {
        getIncident : '/api/Incident/getIncident',
        getIncidentByUser : '/api/Incident/getIncidentforUser',
        getIncidentByType: '/api/Incident/getIncidentforType'
    }
}

export default Enviroment;
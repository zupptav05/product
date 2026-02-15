package com.api.rest;

import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Stateless
@Path("usuarios")
public class UsuarioResource {

    @PersistenceContext(unitName = "MiPrimerAPIPU")
    private EntityManager em;

    // MÉTODO PARA MOSTRAR (Usado por la App Móvil)
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public List<Usuario> getUsuarios() {
        return em.createQuery("SELECT u FROM Usuario u", Usuario.class).getResultList();
    }

    // MÉTODO PARA REGISTRAR (Usado por la Página Web)
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response crearUsuario(Usuario nuevoUsuario) {
        try {
            em.persist(nuevoUsuario);
            return Response.status(Response.Status.CREATED).entity(nuevoUsuario).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
        }
    }
}
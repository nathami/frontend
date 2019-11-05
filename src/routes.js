import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainUsuario from './pages/usuario/main';
import DetalhesUsuario from './pages/usuario/detalhes';
import CriarUsuario from './pages/usuario/criar';
import DeletarUsuario from './pages/usuario/deletar';
import EditarUsuario from './pages/usuario/editar';

import MainPonto from './pages/ponto/main';
import DetalhesPonto from './pages/ponto/detalhes';
import CriarPonto from './pages/ponto/criar';
import DeletarPonto from './pages/ponto/deletar';
import EditarPonto from './pages/ponto/editar';

const Routes = () => (
    
    <BrowserRouter>
        <Switch>
            <Route exact path = "/Usuario" component={MainUsuario} />
            <Route path = "/DetalhesUsuario/:id" component={DetalhesUsuario} />
            <Route path = "/CriarUsuario/" component={CriarUsuario} />
            <Route path = "/DeletarUsuario/:id" component={DeletarUsuario} />
            <Route path = "/EditarUsuario/:id" component={EditarUsuario} />

            <Route exact path = "/Ponto" component={MainPonto} />
            <Route path = "/DetalhesPonto/:id" component={DetalhesPonto} />
            <Route path = "/CriarPonto/" component={CriarPonto} />
            <Route path = "/DeletarPonto/:id" component={DeletarPonto} />
            <Route path = "/EditarPonto/:id" component={EditarPonto} />
        </Switch>
    </BrowserRouter>
)

export default Routes;
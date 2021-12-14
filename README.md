# volto-eea-relations
[![Releases](https://img.shields.io/github/v/release/eea/volto-eea-relations)](https://github.com/eea/volto-eea-relations/releases)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-eea-relations%2Fmaster&subject=master)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-eea-relations/job/master/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-eea-relations-master&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-eea-relations-master)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-eea-relations-master&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-eea-relations-master)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-eea-relations-master&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-eea-relations-master)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-eea-relations-master&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-eea-relations-master)

[![Pipeline](https://ci.eionet.europa.eu/buildStatus/icon?job=volto-addons%2Fvolto-eea-relations%2Fdevelop&subject=develop)](https://ci.eionet.europa.eu/view/Github/job/volto-addons/job/volto-eea-relations/job/develop/display/redirect)
[![Lines of Code](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-eea-relations-develop&metric=ncloc)](https://sonarqube.eea.europa.eu/dashboard?id=volto-eea-relations-develop)
[![Coverage](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-eea-relations-develop&metric=coverage)](https://sonarqube.eea.europa.eu/dashboard?id=volto-eea-relations-develop)
[![Bugs](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-eea-relations-develop&metric=bugs)](https://sonarqube.eea.europa.eu/dashboard?id=volto-eea-relations-develop)
[![Duplicated Lines (%)](https://sonarqube.eea.europa.eu/api/project_badges/measure?project=volto-eea-relations-develop&metric=duplicated_lines_density)](https://sonarqube.eea.europa.eu/dashboard?id=volto-eea-relations-develop)


[Volto](https://github.com/plone/volto) add-on

### Example of render output

![relations-block (1)](https://user-images.githubusercontent.com/152852/135653465-f38f4448-31ef-485a-8dbd-be866a98f622.png)

## Features

Used together with [eea.relations](https://github.com/eea/eea.relations) package, this addon displays the `forward`, `backward` and
`auto-relations` of the current context in a series of album cards placed within the panels of a tab component.

> :warning: **Not all relations will show up**
>
> Only if the related objects are added as `Content type` and `Possible relations`
> from `site/portal_relations`, otherwise any other relations will be ignored from
> this component's render output.

### Configuration

It is configurable through the following `config` modifiers for `settings.eeaRelations`:

> `settings.eeaRelations.parentNodeSelector`: `#page-document`
>
This css selector is used to control where the component render output should be appended.
>
> `settings.eeaRelations.envParentNodeSelector`: `RAZZLE_EEA_RELATIONS_PARENT_SELECTOR`
>
This variable can be passed by `Rancher` or by starting `Volto` with this environment variable in order to set the parent node selector where the component render should be appended to.

This will have higher precedence over the previous setting of the parent node since you
can pass this variable to the start of the server.

E.g.
> RAZZLE_EEA_RELATIONS_PARENT_SELECTOR=#view yarn start


> `settings.eeaRelations.maxAlbumsPerPanel`: `4`

A `Pagination` component will show up in the `Tab Panel` in case there are more albums than the number defined in this setting.


## Getting started

### Try volto-eea-relations with Docker

1. Get the latest Docker images

   ```
   docker pull plone
   docker pull plone/volto
   ```

1. Start Plone backend
   ```
   docker run -d --name plone -p 8080:8080 -e SITE=Plone -e PROFILES="profile-plone.restapi:blocks" plone
   ```

1. Start Volto frontend

   ```
   docker run -it --rm -p 3000:3000 --link plone -e ADDONS="@eeacms/volto-eea-relations" plone/volto
   ```

1. Go to http://localhost:3000

### Add volto-eea-relations to your Volto project

1. Make sure you have a [Plone backend](https://plone.org/download) up-and-running at http://localhost:8080/Plone

1. Start Volto frontend

* If you already have a volto project, just update `package.json`:

   ```JSON
   "addons": [
       "@eeacms/volto-eea-relations"
   ],

   "dependencies": {
       "@eeacms/volto-eea-relations": "^1.0.0"
   }
   ```

* If not, create one:

   ```
   npm install -g yo @plone/generator-volto
   yo @plone/volto my-volto-project --addon @eeacms/volto-eea-relations
   cd my-volto-project
   ```

1. Install new add-ons and restart Volto:

   ```
   yarn
   yarn start
   ```

1. Go to http://localhost:3000

1. Happy editing!

## How to contribute

See [DEVELOP.md](https://github.com/eea/volto-eea-relations/blob/master/DEVELOP.md).

## Copyright and license

The Initial Owner of the Original Code is European Environment Agency (EEA).
All Rights Reserved.

See [LICENSE.md](https://github.com/eea/volto-eea-relations/blob/master/LICENSE.md) for details.

## Funding

[European Environment Agency (EU)](http://eea.europa.eu)
eea.europa.eu)

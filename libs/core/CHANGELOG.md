# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/orchestratora/orchestrator/compare/@orchestrator/core@2.0.0-next.2...@orchestrator/core@2.0.0) (2021-12-13)

**Note:** Version bump only for package @orchestrator/core





# [2.0.0-next.2](https://github.com/orchestratora/orchestrator/compare/@orchestrator/core@2.0.0-next.1...@orchestrator/core@2.0.0-next.2) (2021-12-10)


### Bug Fixes

* **core:** re-export gen-io-ts lib ([34d2268](https://github.com/orchestratora/orchestrator/commit/34d2268414e8421d1f3b1d548f0e2802a731bbd2))





# [2.0.0-next.1](https://github.com/orchestratora/orchestrator/compare/@orchestrator/core@2.0.0-next.0...@orchestrator/core@2.0.0-next.1) (2021-12-09)


### Bug Fixes

* **core:** replace deprecate pipe usage from fp-ts ([cc8f1a3](https://github.com/orchestratora/orchestrator/commit/cc8f1a37b5b7a446b46fa4da1ef5593d592783e0))
* **core:** update peer dependencies ([b8927dd](https://github.com/orchestratora/orchestrator/commit/b8927dd7a6e09ff8f7a8b917860916d28a2f413c))





# [2.0.0-next.0](https://github.com/orchestratora/orchestrator/compare/@orchestrator/core@1.0.0...@orchestrator/core@2.0.0-next.0) (2021-12-06)


### Features

* **ng:** update to Angular v13 ([a95e8d4](https://github.com/orchestratora/orchestrator/commit/a95e8d4848a29b123a2951407de7fb0e4cfda2d3))


### BREAKING CHANGES

* **ng:** Libraries updated to Angular v13 and compiled using partial compilation





# [1.0.0](https://github.com/orchestratora/orchestrator/compare/@orchestrator/core@1.0.0-next.0...@orchestrator/core@1.0.0) (2020-08-15)

**Note:** Version bump only for package @orchestrator/core





# [1.0.0-next.0](https://github.com/orchestratora/orchestrator/compare/@orchestrator/core@0.2.2-next.0...@orchestrator/core@1.0.0-next.0) (2020-06-30)


### Features

* **deps:** require Angular v10 as a peer dependency ([d70f8de](https://github.com/orchestratora/orchestrator/commit/d70f8de2a2554dcdb99836ad4b912a9de0e12ea8))
* **deps:** upgrade to Angular v10 ([469d382](https://github.com/orchestratora/orchestrator/commit/469d382175067532cdb156739ff14f39c4151509))


### BREAKING CHANGES

* **deps:** After the library migrated to Angular v10 - now you should use Angular v10 as a
peer dependency.
* **deps:** Now the library is built using Angular v10. No public API changes.





## [0.2.2-next.0](https://github.com/orchestratora/orchestrator/compare/@orchestrator/core@0.2.1...@orchestrator/core@0.2.2-next.0) (2020-05-01)


### Bug Fixes

* **core:** remove try/catch from configuration codec generation ([b095913](https://github.com/orchestratora/orchestrator/commit/b095913903aea66f68c0342f9f8316b9d07edd13)), closes [#47](https://github.com/orchestratora/orchestrator/issues/47)
* **lib:** upgrade to latest Angular with libs ([5921d28](https://github.com/orchestratora/orchestrator/commit/5921d28a20423f6d1a37dfa4d0459d24a48c907e))





## [0.2.1](https://github.com/orchestratora/orchestrator/compare/@orchestrator/core@0.2.1-next.0...@orchestrator/core@0.2.1) (2020-03-17)

**Note:** Version bump only for package @orchestrator/core





## [0.2.1-next.0](https://github.com/orchestratora/orchestrator/compare/@orchestrator/core@0.2.0...@orchestrator/core@0.2.1-next.0) (2020-03-17)


### Bug Fixes

* **core:** metadata definition logic ([ff9ebb7](https://github.com/orchestratora/orchestrator/commit/ff9ebb7dd15fe16955a3ca946d2e787138800fd0))





# [0.2.0](https://github.com/orchestratora/orchestrator/compare/@orchestrator/core@0.1.0...@orchestrator/core@0.2.0) (2020-03-09)


### Bug Fixes

* **core:** export component map APIs ([6b50faa](https://github.com/orchestratora/orchestrator/commit/6b50faa82629a67e22f6e2e6f097c50064767d7f))
* **core:** remove deprecated token for dynamic components ([4f77dd8](https://github.com/orchestratora/orchestrator/commit/4f77dd8b89e9a68b70a1d1733be88aacae4e9b81))


### Features

* **core:** add context to local injector and orchestrator component ([ad33c68](https://github.com/orchestratora/orchestrator/commit/ad33c68fb6bb75cb04d5ea8d180fefc780712ec6)), closes [#39](https://github.com/orchestratora/orchestrator/issues/39)





# [0.1.0](https://github.com/orchestratora/orchestrator/compare/@orchestrator/core@0.1.0-next.1...@orchestrator/core@0.1.0) (2020-03-09)

**Note:** Version bump only for package @orchestrator/core





# [0.1.0-next.1](https://github.com/orchestratora/orchestrator/compare/@orchestrator/core@0.1.0-next.0...@orchestrator/core@0.1.0-next.1) (2020-03-08)


### Bug Fixes

* **changelogs:** mention removed NPM packages ([50a04f5](https://github.com/orchestratora/orchestrator/commit/50a04f5f628920c874eeadbefe3f543107b1d5bb))
* **core:** remove old $schema field from package.json ([a02b34d](https://github.com/orchestratora/orchestrator/commit/a02b34d53e9a884bc7508d4aa713c8aa2470efcd))





# 0.1.0-next.0 (2020-03-08)

_NOTE:_ This version was removed from NPM due to incomplete package

### Bug Fixes

* **core:** add dynamic module providers to withComponents static method ([f8b2c20](https://github.com/orchestratora/orchestrator/commit/f8b2c20b2167107409c78055de46cc9067ccb961))
* **core:** add static injector maps ([dd48e1f](https://github.com/orchestratora/orchestrator/commit/dd48e1f5ecc593585cdf2b2fdc6c76da9afc4eea))
* **core:** export public API entities ([051faf5](https://github.com/orchestratora/orchestrator/commit/051faf577832dd3090d1e4cba8e61994276df47a))
* **core:** local injector map multi token provider ([66c0be2](https://github.com/orchestratora/orchestrator/commit/66c0be2c933782cb8cd26be6bad00ca54c89c0b7)), closes [#28](https://github.com/orchestratora/orchestrator/issues/28)
* **core:** make INJECTOR_MAP_TOKEN factory AOT compliant ([89ef05a](https://github.com/orchestratora/orchestrator/commit/89ef05a3442bb2a5fa088f12a82d134cfd688abe)), closes [#28](https://github.com/orchestratora/orchestrator/issues/28)
* **core:** pin fp-ts and io-ts libs to specifix v1 ([61f2cf4](https://github.com/orchestratora/orchestrator/commit/61f2cf450e09daec665d0373087e62cb8f195fff))
* **core:** update `@orchestrator/gen-io-ts` library ([e598706](https://github.com/orchestratora/orchestrator/commit/e5987067e5cd5f22a96f76426379dd5267d0bb20))
* **core:** update deprecated types from io-ts ([8f369e6](https://github.com/orchestratora/orchestrator/commit/8f369e6516f0c71ef04520d64998f7ce03c085b0))
* **core:** update usage of ng-dynamic-component lib ([d719d3a](https://github.com/orchestratora/orchestrator/commit/d719d3a77cdb7bbf64428746a06f073f10cfc80f))
* **core:** upgrade @orchestrator/gen-io-ts to v2.0.2 ([b98ee54](https://github.com/orchestratora/orchestrator/commit/b98ee54212569ecffa629f9bfae352408e7f4ec4))
* **modules:** move providers to static methods ([38f56f5](https://github.com/orchestratora/orchestrator/commit/38f56f50f0aa2470bf052f55daf3df41bca78b50))


### Features

* **core:** add context to dynamic component inputs ([5b1b12a](https://github.com/orchestratora/orchestrator/commit/5b1b12a1163afeed2941e4c93c85beb3a651bd5c))
* **core:** add handlers to config item ([0df9b77](https://github.com/orchestratora/orchestrator/commit/0df9b7759422ec210004cf828c5afc623de4a329)), closes [#28](https://github.com/orchestratora/orchestrator/issues/28)
* **core:** add more config decorators ([5cffaff](https://github.com/orchestratora/orchestrator/commit/5cffaff40d9abe3034541ef88b909b6bcbc43b7e))
* **core:** capture errors from @OptionFunction functions ([b443b4c](https://github.com/orchestratora/orchestrator/commit/b443b4cc8004b961f38e6278f00ce36772b0780a)), closes [#28](https://github.com/orchestratora/orchestrator/issues/28)
* **core:** support custom arguments with `$` prefix in functions ([da9efec](https://github.com/orchestratora/orchestrator/commit/da9efec7cc78d1cba4087eb7a0d380e77dcd6d33)), closes [#28](https://github.com/orchestratora/orchestrator/issues/28)
* **core:** support handlers to attach to component outputs ([aca1284](https://github.com/orchestratora/orchestrator/commit/aca1284e3333fbb6f41a67e1231b92e309a404f4)), closes [#28](https://github.com/orchestratora/orchestrator/issues/28)
* **core:** update io-ts to v2 with it's deps libs ([89ed81a](https://github.com/orchestratora/orchestrator/commit/89ed81aa296b87c13806602bd0ce5dde3c1d0496))
* **release:** automate libs releases with lerna ([b455742](https://github.com/orchestratora/orchestrator/commit/b45574223b347fad3b01b8a0294a0ddc3e88875d))
* **repo:** update to NG n9 and NX v9 ([e0555ae](https://github.com/orchestratora/orchestrator/commit/e0555aef981563b9ebd7ef5731fe691a7c40877d))
* **ui-web:** add textWithCtx to config of text component ([b0e1927](https://github.com/orchestratora/orchestrator/commit/b0e1927b1e643248940b28110c7795650520e356))


### Performance Improvements

* **core:** cache token mappings in mapped injector ([844f7ff](https://github.com/orchestratora/orchestrator/commit/844f7ffc177e714c1c2a10515301713cdef8ff26)), closes [#30](https://github.com/orchestratora/orchestrator/issues/30)
* **core:** optimize function parsing regexes ([c9f3193](https://github.com/orchestratora/orchestrator/commit/c9f319314d17a69515cdf0ff294c471e6de1aca9)), closes [#28](https://github.com/orchestratora/orchestrator/issues/28)


### Reverts

* chore(release): publish ([0cb44fa](https://github.com/orchestratora/orchestrator/commit/0cb44fa88f147459ba55445baee8d28299f9b614))
* chore(release): publish ([0e2c1ce](https://github.com/orchestratora/orchestrator/commit/0e2c1cea1694916c1808460ca98951c6871a0eed))

TESTS = $(shell find test -name "*.test.js")
SPECS = $(shell find test -name "*.spec.js")

test:
	NODE_ENV=test ./node_modules/.bin/mocha $(TESTS)

spec:
	NODE_ENV=test ./node_modules/.bin/mocha $(SPECS)

.PHONY: test spec
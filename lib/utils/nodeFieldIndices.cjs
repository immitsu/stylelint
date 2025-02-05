// NOTICE: This file is generated by Rollup. To modify it,
// please instead edit the ESM counterpart and rebuild with Rollup (npm run build).
'use strict';

const getAtRuleParams = require('./getAtRuleParams.cjs');
const getRuleSelector = require('./getRuleSelector.cjs');
const validateTypes = require('./validateTypes.cjs');

/** @import {AtRule, Declaration, Rule} from 'postcss' */

/**
 * @param {AtRule} atRule
 * @returns {number}
 */
function atRuleParamIndex(atRule) {
	const index = atRuleAfterNameIndex(atRule);

	return index + (atRule.raws.afterName?.length ?? 0);
}

/**
 * @param {AtRule} atRule
 * @returns {number}
 */
function atRuleAfterIndex(atRule) {
	// subtract 1 for `}`

	const endOffset = atRule.source?.end?.offset;

	if (!endOffset) return atRule.toString().length - 1;

	const afterLength = atRule.raws?.after?.length;

	if (!afterLength) return endOffset - 1;

	return endOffset - (afterLength + 1);
}

/**
 * @param {AtRule} atRule
 * @returns {number}
 */
function atRuleAfterNameIndex(atRule) {
	// Initial 1 is for the `@`
	return 1 + atRule.name.length;
}

/**
 * @param {AtRule} atRule
 * @returns {number}
 */
function atRuleBetweenIndex(atRule) {
	return atRuleParamIndex(atRule) + getAtRuleParams(atRule).length;
}

/**
 * @param {Declaration} decl
 * @returns {number}
 */
function declarationBetweenIndex(decl) {
	const { prop } = decl.raws;
	const propIsObject = validateTypes.isObject(prop);

	return countChars([
		propIsObject && 'prefix' in prop && prop.prefix,
		(propIsObject && 'raw' in prop && prop.raw) || decl.prop,
		propIsObject && 'suffix' in prop && prop.suffix,
	]);
}

/**
 * Get the index of a declaration's value
 *
 * @param {Declaration} decl
 * @returns {number}
 */
function declarationValueIndex(decl) {
	const { between, value } = decl.raws;

	return (
		declarationBetweenIndex(decl) +
		countChars([between || ':', value && 'prefix' in value && value.prefix])
	);
}

/**
 * @param {Rule} rule
 * @returns {number}
 */
function ruleBetweenIndex(rule) {
	return getRuleSelector(rule).length;
}

/**
 * @param {Rule} rule
 * @returns {number}
 */
function ruleAfterIndex(rule) {
	// subtract 1 for `}`

	const endOffset = rule.source?.end?.offset;

	if (!endOffset) return rule.toString().length - 1;

	const afterLength = rule.raws?.after?.length;

	if (!afterLength) return endOffset - 1;

	return endOffset - (afterLength + 1);
}

/**
 * @param {unknown[]} values
 * @returns {number}
 */
function countChars(values) {
	return values.reduce((/** @type {number} */ count, value) => {
		if (validateTypes.isString(value)) return count + value.length;

		return count;
	}, 0);
}

exports.atRuleAfterIndex = atRuleAfterIndex;
exports.atRuleAfterNameIndex = atRuleAfterNameIndex;
exports.atRuleBetweenIndex = atRuleBetweenIndex;
exports.atRuleParamIndex = atRuleParamIndex;
exports.declarationBetweenIndex = declarationBetweenIndex;
exports.declarationValueIndex = declarationValueIndex;
exports.ruleAfterIndex = ruleAfterIndex;
exports.ruleBetweenIndex = ruleBetweenIndex;

var extend     = require('just-extend');
var gettext    = require('gettext-parser');
var gutil      = require('gulp-util');
var path       = require('path');
var pluginName = require('./package.json').name;
var through    = require('through2');

module.exports = function( options ) {
	'use strict';

	options = extend({
		language: 'en_US',
		separator: '-',
	}, options );

	return through.obj( function( file, enc, cb ) {
		if( file.isNull() ) {
			this.push( file );
			return cb();
		}
		if( file.isStream() ) {
			this.emit( 'error', new gutil.PluginError( pluginName, 'Streaming not supported' ));
			return cb();
		}
		var parsed = gettext.po.parse( file.contents );
		var translations = parsed.translations;
		parsed.headers['language'] = options.language;
		Object.keys( translations ).forEach( function( catalog ) {
			Object.keys( translations[catalog] ).forEach( function( key ) {
				if( key.length === 0 )return;
				var strObj = translations[catalog][key];
				strObj.msgstr[0] = strObj.msgid;
				if( strObj.msgid_plural ) {
					strObj.msgstr[1] = strObj.msgid_plural;
				}
			});
		});
		file.contents = gettext.po.compile( parsed );
		var filePath = file.path;
		var dirname = path.dirname( filePath );
		var basename = path.basename( filePath, path.extname( filePath ));
		file.path = path.join( dirname, basename + options.separator + options.language + '.po' );
		this.push( file );
		cb();
	});
};

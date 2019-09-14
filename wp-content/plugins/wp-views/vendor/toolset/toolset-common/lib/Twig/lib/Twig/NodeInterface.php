<?php

namespace OTGS\Toolset;

/*
 * This file is part of Twig.
 *
 * (c) Fabien Potencier
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
use OTGS\Toolset\Twig\Compiler;
/**
 * Represents a node in the AST.
 *
 * @author Fabien Potencier <fabien@symfony.com>
 *
 * @deprecated since 1.12 (to be removed in 3.0)
 */
interface Twig_NodeInterface extends \Countable, \IteratorAggregate
{
    /**
     * Compiles the node to PHP.
     */
    public function compile(\OTGS\Toolset\Twig\Compiler $compiler);
    /**
     * @deprecated since 1.27 (to be removed in 2.0)
     */
    public function getLine();
    public function getNodeTag();
}
/**
 * Represents a node in the AST.
 *
 * @author Fabien Potencier <fabien@symfony.com>
 *
 * @deprecated since 1.12 (to be removed in 3.0)
 */
/* class_alias removed from here because it becomes redundant with namespacing */
